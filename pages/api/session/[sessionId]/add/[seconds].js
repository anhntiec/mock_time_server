import sessions from '../../../../../components/Sessions';

export default (req, res) => {
    const session = sessions.get(req.query.sessionId);
    const seconds = req.query.seconds;
    session.offset += seconds * 1;
    res.status(200).send(session.offset);
}
