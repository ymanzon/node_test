exports.Ok = (content, res) => {
    res.status(200).json({ success: true, data: content });
}

exports.Created = (content, res) => {
    res.status(201).json({ success: true, data: content });
}

exports.BadRequest = (content, res) => {
    res.status(400).json({ success: false, message: content });
}

exports.NotFound = (content, res) => {
    res.status(404).json({ success: false, message: content });
}

exports.InternalServerError = (content, res) => {
    res.status(500).json({ success: false, message: content });
}