import type {MetaFunction} from '@remix-run/cloudflare';

export type MetaArgs<Loader> = Parameters<MetaFunction<Loader>>