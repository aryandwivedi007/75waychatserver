import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY || 'abcdefghijkla12';

export const generateInviteToken = (roomId: string, memberId: string) => {
  const payload = {
    roomId: roomId,
    memberId: memberId,
  };

  return jwt.sign(payload, secretKey, { expiresIn: '24h' });
};

export const generateInviteLink = (roomId: string, memberId: string) => {
  const token = generateInviteToken(roomId, memberId);
  const inviteLink = `http://localhost:5000/api/rooms/${roomId}/invite?token=${token}`;
  return inviteLink;
};

export const verifyInviteToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (err) {
    return null;
  }
};
