import {NextAuthOptions} from "next-auth";
import GitHubAuthProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

// import dbConnect from "lib/dbConnect";
// import User from "models/User";

const {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  // GITHUB_CLIENT_ID_LOCAL,
  // GITHUB_CLIENT_SECRET_LOCAL,
  // MODE,
} = process.env;

// const GIT_CLIENT_ID =
//   MODE === "development" ? GITHUB_CLIENT_ID_LOCAL : GITHUB_CLIENT_ID;
// const GIT_CLIENT_SECRET =
//   MODE === "development" ? GITHUB_CLIENT_SECRET_LOCAL : GITHUB_CLIENT_SECRET;

export const authOptions: NextAuthOptions = {
  // providers: [
  //   GoogleProvider({
  //     clientId: process.env.GOOGLE_CLIENT_ID as string,
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  //     async profile(profile) {
  //       await dbConnect();
  //       const oldUser = await User.findOne({name: profile.name});
  //       const userProfile = {
  //         email: profile.email,
  //         name: profile.name || profile.login,
  //         avatar: profile.picture,
  //         role: "user",
  //       };

  //       if (!oldUser) {
  //         const newUser = new User({
  //           ...userProfile,
  //           provider: "google",
  //         });

  //         await newUser.save();
  //       } else {
  //         userProfile.role = oldUser.role;
  //       }
  //       return {id: profile.sub, ...userProfile};
  //     },
  //   }),
  //   GitHubAuthProvider({
  //     clientId: GITHUB_CLIENT_ID as string,
  //     clientSecret: GITHUB_CLIENT_SECRET as string,
  //     async profile(profile) {
  //       await dbConnect();
  //       const oldUser = await User.findOne({name: profile.name});
  //       const userProfile = {
  //         email: profile.email,
  //         name: profile.name || profile.login,
  //         avatar: profile.avatar_url,
  //         role: "user",
  //       };

  //       if (!oldUser) {
  //         const newUser = new User({
  //           ...userProfile,
  //           provider: "github",
  //         });

  //         await newUser.save();
  //       } else {
  //         userProfile.role = oldUser.role;
  //       }
  //       return {id: profile.id, ...userProfile};
  //     },
  //   }),
  // ],
  // callbacks: {
  //   jwt({token, user}) {
  //     if (user) token.role = (user as any).role;
  //     return token;
  //   },
  //   async session({session}) {
  //     await dbConnect();
  //     const user = await User.findOne({name: session.user?.name});
  //     if (user)
  //       session.user = {
  //         id: user._id.toString(),
  //         name: user.name,
  //         email: user.email,
  //         avatar: user.avatar,
  //         role: user.role,
  //       } as any;
  //     return session;
  //   },
  // },
  // pages: {
  //   signIn: "/auth/signin",
  //   error: "/404",
  // },
  providers: [
    GitHubAuthProvider({
      clientId: GITHUB_CLIENT_ID as string,
      clientSecret: GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
};
