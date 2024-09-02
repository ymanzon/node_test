exports.Ok = (content, res) => {
    res.status(200).json({ success: true, data: content, error: false });
}

exports.Created = (content, res) => {
    res.status(201).json({ success: true, data: content, error: false });
}

exports.BadRequest = (content, res) => {
    res.status(200).json({ success: true, message: content, error:true });
}

exports.NotFound = (content, res) => {
    res.status(404).json({ success: true, message: content, error: true });
}

exports.InternalServerError = (content, res) => {
    res.status(500).json({ success: true, message: content, error:true });
}