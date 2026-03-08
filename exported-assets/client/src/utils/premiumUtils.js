// Utility functions for handling premium features

export const redirectToPremium = (featureName = 'This feature') => {
  // Direct redirect to services page
  window.location.href = '/services#pricing'
}

export const checkPremiumFeature = (user, featureName, callback) => {
  if (!user?.isPremium) {
    redirectToPremium(featureName)
    return false
  }
  if (callback) callback()
  return true
}

export const isPremiumUser = (user) => {
  return user?.isPremium === true
}