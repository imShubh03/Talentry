import jwt from 'jsonwebtoken';

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: 'User not authenticated', 
                success: false,
            });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        req.id = decoded.userId; // Adjust if needed based on actual token structure

        next(); 
    } catch (error) {
        console.log("Error:", error);
        
        return res.status(500).json({
            message: 'Server error',
            success: false,
        });
    }
};

export default isAuthenticated;
