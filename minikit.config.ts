// MiniKit configuration for Base Mini App
// See: https://docs.base.org/mini-apps/quickstart/create-new-miniapp

export const minikitConfig = {
  // Account association - you'll need to generate this after deploying
  // Visit: https://base.dev to set up your account association
  accountAssociation: {
    header: "",
    payload: "",
    signature: ""
  },
  
  // Mini App manifest configuration
  miniapp: {
    version: "1",
    name: "Crypto IQ",
    iconUrl: "https://your-domain.vercel.app/icon.png",
    homeUrl: "https://your-domain.vercel.app",
    splashImageUrl: "https://your-domain.vercel.app/splash.png",
    splashBackgroundColor: "#0a0a0f",
    primaryCategory: "games",
    description: "Test your blockchain knowledge with 50 questions across 7 categories. Get your Crypto IQ score and compete with friends!",
    socialLinks: {
      website: "https://your-domain.vercel.app"
    },
    features: {
      // Set to true if your app uses notifications
      notifications: false
    },
    // Set to true during development to hide from search
    noindex: true
  }
};
