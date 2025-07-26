export class MaintenanceRecord {
    constructor(id, vehicleId, serviceDate, description, cost, mileage) {
      this.id = id;
      this.vehicleId = vehicleId;
      this.serviceDate = serviceDate;
      this.description = description;
      this.cost = cost;
      this.mileage = mileage;
    }
  }
  