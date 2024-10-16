CREATE TABLE directMessage_new (
    id INTEGER PRIMARY KEY,
    message TEXT NOT NULL,
    channelId TEXT NOT NULL REFERENCES dmChannel(id)
);

INSERT INTO directMessage_new (id, message, channelId)
SELECT id, message, '' AS channelId  -- Or provide actual data for channelId here
FROM directMessage;

DROP TABLE directMessage;

ALTER TABLE directMessage_new RENAME TO directMessage;
