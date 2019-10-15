import sessions from '../../../../components/Sessions';

export default (req, res) => {
    const session = sessions.get(req.query.sessionId);
    res.status(200).json(session);
}
