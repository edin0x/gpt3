import { Configuration, OpenAIApi } from "openai";
import { config } from "../config";
import readline from "readline-sync";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const showTopMessage = () =>
  console.log(`
██████╗  ██████╗ ████████╗  ██████╗     ███████╗ ██████╗██╗      ███████╗██╗    ███████╗████████╗ ██████╗ ██████╗ ██╗   ██╗     ██████╗ ███████╗███╗   ██╗███████╗██████╗  █████╗ ████████╗ ██████╗ ██████╗ 
██╔════╝ ██╔══██╗╚══██╔══╝  ╚════██╗    ██╔════╝██╔════╝██║      ██╔════╝██║    ██╔════╝╚══██╔══╝██╔═══██╗██╔══██╗╚██╗ ██╔╝    ██╔════╝ ██╔════╝████╗  ██║██╔════╝██╔══██╗██╔══██╗╚══██╔══╝██╔═══██╗██╔══██╗
██║  ███╗██████╔╝   ██║█████╗█████╔╝    ███████╗██║     ██║█████╗█████╗  ██║    ███████╗   ██║   ██║   ██║██████╔╝ ╚████╔╝     ██║  ███╗█████╗  ██╔██╗ ██║█████╗  ██████╔╝███████║   ██║   ██║   ██║██████╔╝
██║   ██║██╔═══╝    ██║╚════╝╚═══██╗    ╚════██║██║     ██║╚════╝██╔══╝  ██║    ╚════██║   ██║   ██║   ██║██╔══██╗  ╚██╔╝      ██║   ██║██╔══╝  ██║╚██╗██║██╔══╝  ██╔══██╗██╔══██║   ██║   ██║   ██║██╔══██╗
╚██████╔╝██║        ██║     ██████╔╝    ███████║╚██████╗██║      ██║     ██║    ███████║   ██║   ╚██████╔╝██║  ██║   ██║       ╚██████╔╝███████╗██║ ╚████║███████╗██║  ██║██║  ██║   ██║   ╚██████╔╝██║  ██║
 ╚═════╝ ╚═╝        ╚═╝     ╚═════╝     ╚══════╝ ╚═════╝╚═╝      ╚═╝     ╚═╝    ╚══════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝   ╚═╝        ╚═════╝ ╚══════╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝                                                                                                                                                                                                            
 – by edin0x
`);

async function main() {
  showTopMessage();

  let prompt: string[] = [config.prompt];
  while (true) {
    console.log(`[info] digging into rabbit hole..`);
    const response = await openai.createCompletion({
      ...config,
      prompt,
    });
    console.log(`[info] digging complete.`);
    console.log(`[inf] Story so far:\n\x1b[33m${prompt.join("")}\x1b[0m`);
    console.log(`==========================================================`);

    const choices = (response.data.choices || []).map((c) => c.text || "");
    const index = readline.keyInSelect(choices, "what's next? ");
    if (index === -1) {
      console.log(`[info] end of story.`);
      break; // out of the rabbit hole
    }

    const chosenText = response.data.choices?.[index].text;
    prompt.push(`\n${chosenText?.replaceAll("\n", "")}.`);
  }
}

main();
