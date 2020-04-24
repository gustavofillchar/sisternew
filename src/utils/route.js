export function getTotalStudents(route) {
  return route.stops.reduce((total, stop) => {
    return total + parseInt(stop.amountStudents || 0, 10);
  }, 0);
}
