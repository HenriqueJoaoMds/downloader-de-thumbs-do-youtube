const rls = require("readline-sync");
const path = require("path");
const fs = require("fs");
const axios = require("axios");

async function main() {
  const tmpUrl = rls.question("Qual é a url do video?: ");
  let id = tmpUrl;

  for (let i = 0; i < tmpUrl.length; i++) {
    if (tmpUrl.slice(i, i + 3) == "?v=") {
      id = tmpUrl.slice(i + 3, tmpUrl.length);
    }
  }

  let url = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

  fs.mkdir("./imagens", () => {});
  let caminho = path.resolve(__dirname, "imagens", id + ".jpg");
  let resposta = await axios({
    method: "get",
    url: url,
    responseType: "stream"
  }).catch(err => {
    console.log(err);
  });
  await resposta.data.pipe(fs.createWriteStream(caminho));
}

main();
