import jwt from 'jsonwebtoken';

const JWT_SECRET = "41c80437abeb08a3e66ffa668763e456a780bac7749110cace293aea1e95cd981e83574615033826e65102dfecdf477a078f0ec5feb1681c9afec59842a63540";

// Function to generate a JWT token
export const generateToken = (userId: string) => {
    return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1h' });
};

// Middleware to authenticate JWT tokens
export const authenticateToken = (req: any, res: any, next: any) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};
