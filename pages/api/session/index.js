import sessions from '../../../components/Sessions';

export default (req, res) => {
  res.status(200).json(sessions.sessions)
}
