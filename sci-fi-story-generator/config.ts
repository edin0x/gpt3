import { CreateCompletionRequest } from "openai";

export const config = {
  model: "text-curie-001",
  prompt:
    "Here is an award winning sci-fi story.\nby edin0x\n\nThe year is 2093. Humans have faced and have overcome many challenges since the beginning of the millennium.",
  temperature: 0.5,
  max_tokens: 100,
  top_p: 1,
  frequency_penalty: 1,
  presence_penalty: 0,
  n: 5,
  stop: ".\n"
}