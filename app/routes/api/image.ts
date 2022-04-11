import type { LoaderFunction } from "@remix-run/cloudflare";
import {
  imageLoader,
  KVCache,
  kvResolver,
  fetchResolver,
  type Resolver,
} from "~/components/image/server/pure";
import { wasmTransformer } from "~/components/image/server/transformers";

const whitelistedDomains = new Set([
  SELF_URL,
  "images.unsplash.com",
  "assets.blogody.com",
]);

export const myResolver: Resolver = async (asset, url, options, basePath) => {
  if (asset.startsWith("/") && (asset.length === 1 || asset[1] !== "/")) {
    return kvResolver(asset, url, options, basePath);
  } else {
    if (!whitelistedDomains.has(new URL(url).host)) {
      throw new Error("Domain not allowed!");
    }

    return fetchResolver(asset, url, options, basePath);
  }
};

const config = {
  selfUrl: SELF_URL,
  cache: new KVCache({ namespace: IMAGE }),
  resolver: myResolver,
  transformer: wasmTransformer,
};

export const loader: LoaderFunction = ({ request }) => {
  return imageLoader(config, request);
};
