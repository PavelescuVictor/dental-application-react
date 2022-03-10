export const transformLoginResponsePayload = (responsePayload: any) => ({
  userToken: responsePayload.token,
  userTokenExpiry: responsePayload.tokenExpiry,
  user: {
    id: responsePayload.user.id,
    email: responsePayload.user.email,
    isAdmin: responsePayload.user.is_admin,
    isStaff: responsePayload.user.is_staff,
    createdAt: responsePayload.user.createdAt,
    updatedAt: responsePayload.user.updatedAt,
  },
});

export default {};
