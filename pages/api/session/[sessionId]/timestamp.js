import sessions from '../../../../components/Sessions';

export default (req, res) => {
    const session = sessions.get(req.query.sessionId);
    const timestamp = (Date.now() + session.offset * 1000) / 1000;
    const timestr = (timestamp >> 0).toString();
    res.status(200).send(timestr);
}
