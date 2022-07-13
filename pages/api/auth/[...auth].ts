import { passportAuth, PublicData } from "@blitzjs/auth"
import { Strategy as GithubStrategy } from "passport-github2"

export default passportAuth(({ ctx, req, res }) => ({
  successRedirectUrl: "/",
  errorRedirectUrl: "/",
  secureProxy: true,
  strategies: [
    {
      // authenticateOptions: { scope: "user:email" },
      strategy: new GithubStrategy(
        {
          clientID: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET,
          callbackURL: process.env.GITHUB_CALLBACK_URL,
        },
        async function (
          token: string,
          tokenSecret: string,
          profile: any,
          done: (err: Error | null, data?: { publicData: PublicData }) => void
        ) {
          console.log("Github Callback", profile)
          done(null, { publicData: profile })
        }
      ),
    },
  ],
}))
