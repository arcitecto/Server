import { table } from "console";
import http from "http";
import fetch from "node-fetch";
import { createDeflateRaw } from "zlib";

const server = http
  .createServer((req, res) => {
    const url = req.url;
    let tableData =
      "<table border='1'><tr><th>Name</th><th>Height</th><th>Birthyear</th><th>Gender</th><th>URL</th></tr>";
    if (url === "/") {
      res.write("<h1>Home Page</h1>");
      res.write(`<img src="/https://dummyimage.com/600x400/000/fff">`);
      res.end();
    }
    if (url === "/list") {
      fetch("https://swapi.dev/api/people")
        .then((res) => res.json())
        .then((data) => {
          createData(data);
          res.write(tableData);
          res.end();
        });
    }
    if (url !== "/list") {
      res.write("Sorry, this page does not exist.");
      res.end();
    }

    function createData(data) {
      data.results.forEach((element) => {
        tableData += `<tr><td>${element.name}</td><td>${element.height}</td><td>${element.birth_year}</td><td>${element.gender}</td><td>${element.url}</td>`;
      });
      tableData += `</table>`;
    }
  })
  .listen(8090, console.log("Server is listening on port " + 8090));
