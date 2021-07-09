import namor from "namor";

const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  const statusChance = Math.random();
  return {
    email: namor.generate({ words: 1, numbers: 0 }),
    name: namor.generate({ words: 1, numbers: 0 }),
    joinTime: Math.floor(Math.random() * 30),
    leaveTime: Math.floor(Math.random() * 100),
    duration: Math.floor(Math.random() * 100),
    status:
      statusChance > 0.66
        ? "Attended"
        : statusChance > 0.33
        ? "Late"
        : "Absent",
  };
};

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d) => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}
