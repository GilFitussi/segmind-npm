import axios from "axios";

export type FluxRealismLoraType = {
    prompt: string,
    steps?: number | 20,
    seed?: number | null,
    scheduler?: string,
    sampler_name?: string | 'euler',
    aspect_ration?: string | '2:3',
    upscale_value?: number | 20
    lora_strength?: number | 0.8
    upscale?: boolean | true
}

export class FluxRealismLora {
  private url: string;
  private apiKey: string | null;

  constructor(apiKey: string | null = null) {
    this.url = "https://api.segmind.com/v1/flux-realism-lora";
    this.apiKey = apiKey;
  }

  async generate(data: FluxRealismLoraType) {
    if (this.apiKey === null) throw new Error("Not authenticated. Please add API Key.");
    if (data.prompt === "") throw new Error("Please enter a prompt");

    data = {
        prompt: data.prompt,
        steps: data.steps,
        seed: data.seed,
        scheduler: data.scheduler,
        sampler_name: data.sampler_name,
        aspect_ration: data.aspect_ration,
        upscale_value: data.upscale_value,
        lora_strength: data.lora_strength,
        upscale: data.upscale
    }

    //segmind api calls
    return axios({
        url: this.url,
        data: JSON.stringify(data),
        method: 'post',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'x-api-key': `${this.apiKey}`
        }
    })
  }
}

