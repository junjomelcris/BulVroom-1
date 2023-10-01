// vehicles.js

// Sample data for initial vehicles
const initialVehicles = [
    {
      id: '1',
      make: 'Toyota',
      model: 'Camry',
      type: 'Sedan',
      features: 'AC, Bluetooth',
      plate: 'ABC123',
      description: 'Comfortable sedan',
      rate: '₱100/day',
      isFavorite: false,
    },
    {
      id: '2',
      make: 'Honda',
      model: 'Civic',
      type: 'Sedan',
      features: 'AC, USB',
      plate: 'XYZ456',
      description: 'Fuel-efficient sedan',
      rate: '₱90/day',
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
