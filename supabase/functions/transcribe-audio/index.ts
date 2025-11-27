import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Process base64 in chunks to prevent memory issues
function processBase64Chunks(base64String: string, chunkSize = 32768) {
  const chunks: Uint8Array[] = [];
  let position = 0;
  
  while (position < base64String.length) {
    const chunk = base64String.slice(position, position + chunkSize);
    const binaryChunk = atob(chunk);
    const bytes = new Uint8Array(binaryChunk.length);
    
    for (let i = 0; i < binaryChunk.length; i++) {
      bytes[i] = binaryChunk.charCodeAt(i);
    }
    
    chunks.push(bytes);
    position += chunkSize;
  }

  const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;

  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }

  return result;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    console.log('Starting transcription request...');
    const { audio } = await req.json();
    
    if (!audio) {
      throw new Error('No audio data provided');
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('Processing audio data...');
    // Process audio in chunks
    const binaryAudio = processBase64Chunks(audio);
    
    // Prepare form data for Whisper
    const formData = new FormData();
    const blob = new Blob([binaryAudio], { type: 'audio/webm' });
    formData.append('file', blob, 'audio.webm');
    formData.append('model', 'whisper-1');

    console.log('Sending to OpenAI Whisper...');
    // Transcribe with Whisper
    const transcriptionResponse = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
      },
      body: formData,
    });

    if (!transcriptionResponse.ok) {
      const error = await transcriptionResponse.text();
      console.error('Whisper API error:', error);
      throw new Error(`OpenAI Whisper API error: ${error}`);
    }

    const transcriptionResult = await transcriptionResponse.json();
    const transcription = transcriptionResult.text;
    console.log('Transcription complete:', transcription.substring(0, 100) + '...');

    // Generate summary using GPT
    console.log('Generating summary...');
    const summaryResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are a helpful assistant that creates concise summaries of transcribed audio. Focus on key points and main ideas.' 
          },
          { 
            role: 'user', 
            content: `Please provide a concise summary of the following transcription:\n\n${transcription}` 
          }
        ],
        temperature: 0.7,
        max_tokens: 300,
      }),
    });

    if (!summaryResponse.ok) {
      const error = await summaryResponse.text();
      console.error('GPT API error (summary):', error);
      throw new Error(`OpenAI GPT API error: ${error}`);
    }

    const summaryResult = await summaryResponse.json();
    const summary = summaryResult.choices[0].message.content;
    console.log('Summary generated');

    // Generate action items using GPT
    console.log('Generating action items...');
    const actionItemsResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are a helpful assistant that extracts actionable tasks from transcribed audio. Return only a JSON array of action items as strings, nothing else.' 
          },
          { 
            role: 'user', 
            content: `Extract actionable tasks from this transcription as a JSON array of strings:\n\n${transcription}` 
          }
        ],
        temperature: 0.5,
        max_tokens: 200,
      }),
    });

    if (!actionItemsResponse.ok) {
      const error = await actionItemsResponse.text();
      console.error('GPT API error (action items):', error);
      throw new Error(`OpenAI GPT API error: ${error}`);
    }

    const actionItemsResult = await actionItemsResponse.json();
    let actionItems: string[] = [];
    
    try {
      const content = actionItemsResult.choices[0].message.content;
      actionItems = JSON.parse(content);
      if (!Array.isArray(actionItems)) {
        actionItems = [content];
      }
    } catch (e) {
      console.error('Error parsing action items:', e);
      actionItems = [actionItemsResult.choices[0].message.content];
    }
    
    console.log('Action items generated:', actionItems.length);

    return new Response(
      JSON.stringify({ 
        transcription, 
        summary, 
        actionItems 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in transcribe-audio function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
