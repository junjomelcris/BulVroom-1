// vehicles.js

// Sample data for initial vehicles
const initialVehicles = [
    {
      id: '1',
      make: 'Toyota',
      model: 'Camry',
      type: 'Sedan',
      transmission: 'Manual',
      gas: 'Premium',
      features: 'AC, Bluetooth',
      seatingCapacity: '5',
      plate: 'ABC123',
      description: 'Comfortable sedan Comfortable sedan Comfortable sedan Comfortable sedan Comfortable sedan Comfortable sedan Comfortable sedan Comfortable sedan Comfortable sedan Comfortable sedan Comfortable sedanComfortable sedan Comfortable sedan Comfortable sedan Comfortable sedan Comfortable sedan Comfortable sedan Comfortable sedan Comfortable sedan',
      phonenum: '09954047078',
      rate: '₱100',
      deposit: '₱500',
      status: 'APPROVED',
      isFavorite: false,
    },
    {
      id: '2',
      make: 'Honda',
      model: 'Civic',
      type: 'Sedan',
      transmission: 'Automatic',
      gas: 'Unleaded',
      features: 'AC, USB',
      seatingCapacity: '5',
      plate: 'XYZ456',
      description: 'Fuel-efficient sedan',
      phonenum: '09264824211',
      rate: '₱90',
      deposit: '₱500',
      status: 'PENDING',
      isFavorite: true,
    },
    // Add more initial vehicles as needed
  ];
  
  let vehiclesData = initialVehicles;
  
  // Function to get the list of vehicles
  export const getVehicles = () => vehiclesData;
  
  // Function to add a new vehicle to the list
  export const addVehicle = (newVehicle) => {
    vehiclesData = [...vehiclesData, newVehicle];
  };
  
  // Function to toggle the favorite status of a vehicle
  export const toggleFavorite = (vehicleId) => {
    vehiclesData = vehiclesData.map((vehicle) =>
      vehicle.id === vehicleId ? { ...vehicle, isFavorite: !vehicle.isFavorite } : vehicle
    );
  };
