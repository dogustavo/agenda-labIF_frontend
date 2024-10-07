/** @type {import('next').NextConfig} */

const nextConfig = {
  sassOptions: {
    includePaths: ['./src'],
    prependData: `@import "styles/app.scss";`
  }
}

export default nextConfig
