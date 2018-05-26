export function addHost() {
  return process.env.NODE_ENV !== 'prod' ? 'http://localhost:8080' : '';
}
