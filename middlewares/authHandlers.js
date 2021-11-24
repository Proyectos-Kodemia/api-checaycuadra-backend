const authHandler = (req, res, next) => {
	const { apitoken } = req.headers;
	if (apitoken === "TOKEN-123") {
		next();
	} else {
		res.status(403).json({
			ok: false,
			message: "Unauthorized",
		})
	}
};

module.exports = authHandler;