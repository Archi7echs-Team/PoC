DROP TABLE IF EXISTS api;
DROP TABLE IF EXISTS api_labels;
DROP TABLE IF EXISTS data;
DROP TABLE IF EXISTS data_labels;

CREATE TABLE IF NOT EXISTS api(
    id SERIAL PRIMARY KEY,
    x INT NOT NULL,
    y INT NOT NULL,
    z INT NOT NULL
);
CREATE TABLE IF NOT EXISTS api_labels(
    x INT PRIMARY KEY,
    label TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS data(
    id SERIAL PRIMARY KEY,
    x INT NOT NULL,
    y INT NOT NULL,
    z INT NOT NULL
);
CREATE TABLE IF NOT EXISTS data_labels(
    x INT PRIMARY KEY,
    label TEXT NOT NULL
);

INSERT INTO data(x,y,z) VALUES
(-48, 10, 0),
(-48, 15, 5),
(-43, 4, 0),
(-43, 10, 5),
(-38, 8, 0),
(-38, 9, 5),
(-33, 12, 0),
(-33, 17, 5),
(-28, 8, 0),
(-28, 16, 5),
(-23, 6, 0),
(-23, 12, 5),
(-18, 10, 0),
(-18, 15, 5),
(-13, 8, 0),
(-13, 9, 5),
(-8, 12, 0),
(-8, 17, 5),
(-3, 8, 0),
(-3, 16, 5),
(2, 6, 0),
(2, 12, 5),
(7, 10, 0),
(7, 15, 5),
(12, 8, 0),
(12, 9, 5),
(17, 12, 0),
(17, 17, 5),
(22, 8, 0),
(22, 16, 5),
(27, 6, 0),
(27, 12, 5),
(32, 10, 0),
(32, 15, 5),
(37, 8, 0),
(37, 9, 5),
(42, 12, 0),
(42, 17, 5),
(47, 8, 0),
(47, 16, 5);