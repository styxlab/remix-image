import { Link } from "@remix-run/react";
import Image from "remix-image";

//const featureImage =
//  "https://images.unsplash.com/photo-1519374086542-9ff30b72beec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&q=80&w=";

const featureImage =
  "https://assets.blogody.com/image/i57vZeTTm2QKk/blogody-blur-feature-fruit-image.jpg";

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Remix Image Tests</h1>
      <div className='fade-in'>
        <Image
          src={`${featureImage}`}
          responsive={[
            {
              size: {
                width: 400,
                height: 267,
              },
              maxWidth: 640,
            },
            {
              size: {
                width: 800,
                height: 533,
              },
            },
          ]}
          alt='Featured'
          width={1620}
          height={1080}
          decoding='async'
          style={{
            backgroundSize: "cover",
            backgroundColor: "#eee",
            width: "100%",
            height: "auto",
          }}
        />
      </div>
      <p>Only lazy load off-screen images (not the feature image)</p>
      <ul>
        <li>
          <Link to='/'>Standard image</Link>
        </li>
      </ul>
    </div>
  );
}
