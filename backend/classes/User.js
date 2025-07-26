export class User {
    constructor(id, username, passwordHash, role) {
      this.id = id;
      this.username = username;
      this.passwordHash = passwordHash;
      this.role = role; // 'admin' | 'viewer' | 'mechanic'
    }
  }
  