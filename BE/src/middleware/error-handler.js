export function errorHandler(err, req, res, next) { // eslint-disable-line
  console.error(err);
  const map = {
    APPT_OUT_OF_SCHEDULE: { status: 422 },
    APPT_SLOT_TAKEN: { status: 409 },
    BED_SLOT_TAKEN: { status: 409 },
    INSUFFICIENT_STOCK: { status: 422 },
    INVALID_REFRESH: { status: 401 }
  };
  const key = err.message;
  if (map[key]) {
    return res.status(map[key].status).json({ error: key });
  }
  res.status(500).json({ error: 'INTERNAL_ERROR' });
}
