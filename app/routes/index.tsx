import { Link } from "@remix-run/react";

const featureImage =
  "https://images.unsplash.com/photo-1519374086542-9ff30b72beec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&q=80&w=";

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Remix Image Tests</h1>
      <div className='fade-in'>
        <img
          src={`${featureImage}1620`}
          srcSet={`${featureImage}400 400w, ${featureImage}800 800w`}
          sizes='(max-width: 640px) 400px, 800px'
          alt='Featured'
          width={800}
          height={533}
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
          <Link to='/comp'>Image Component</Link>
        </li>
      </ul>
    </div>
  );
}
