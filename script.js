import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 100,
  duration: "5m"
};

let randomId = () => {
  let id = Math.ceil(Math.random() * 10000000);
  return id;
}

let id = randomId();

export default function() {
  let res = http.get(`http://localhost:3001/photosandcomments/${id}`);
  check(res, {
    "status was 200": (r) => r.status == 200,
    "transaction time OK": (r) => r.timings.duration < 200
  });
};