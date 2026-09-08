/* ============================================================
   COUNTRY DATA
   tier: "rookie" | "explorer" | "globetrotter"
   Add more entries any time — just follow the same shape.
   flag: emoji flag (renders natively on Android, zero image
   loading, so it stays fast even on a weak stream connection).
   ============================================================ */

const COUNTRY_DATA = [
  // ---------- ROOKIE (widely known) ----------
  { name: "France", capital: "Paris", flag: "🇫🇷", continent: "Europe", tier: "rookie" },
  { name: "Japan", capital: "Tokyo", flag: "🇯🇵", continent: "Asia", tier: "rookie" },
  { name: "United States", capital: "Washington", flag: "🇺🇸", continent: "North America", tier: "rookie" },
  { name: "United Kingdom", capital: "London", flag: "🇬🇧", continent: "Europe", tier: "rookie" },
  { name: "Italy", capital: "Rome", flag: "🇮🇹", continent: "Europe", tier: "rookie" },
  { name: "Germany", capital: "Berlin", flag: "🇩🇪", continent: "Europe", tier: "rookie" },
  { name: "Spain", capital: "Madrid", flag: "🇪🇸", continent: "Europe", tier: "rookie" },
  { name: "China", capital: "Beijing", flag: "🇨🇳", continent: "Asia", tier: "rookie" },
  { name: "Russia", capital: "Moscow", flag: "🇷🇺", continent: "Europe", tier: "rookie" },
  { name: "Brazil", capital: "Brasilia", flag: "🇧🇷", continent: "South America", tier: "rookie" },
  { name: "Canada", capital: "Ottawa", flag: "🇨🇦", continent: "North America", tier: "rookie" },
  { name: "Australia", capital: "Canberra", flag: "🇦🇺", continent: "Oceania", tier: "rookie" },
  { name: "Mexico", capital: "Mexico City", flag: "🇲🇽", continent: "North America", tier: "rookie" },
  { name: "Egypt", capital: "Cairo", flag: "🇪🇬", continent: "Africa", tier: "rookie" },
  { name: "South Korea", capital: "Seoul", flag: "🇰🇷", continent: "Asia", tier: "rookie" },
  { name: "India", capital: "New Delhi", flag: "🇮🇳", continent: "Asia", tier: "rookie" },
  { name: "Greece", capital: "Athens", flag: "🇬🇷", continent: "Europe", tier: "rookie" },
  { name: "Turkey", capital: "Ankara", flag: "🇹🇷", continent: "Asia", tier: "rookie" },
  { name: "Netherlands", capital: "Amsterdam", flag: "🇳🇱", continent: "Europe", tier: "rookie" },
  { name: "Argentina", capital: "Buenos Aires", flag: "🇦🇷", continent: "South America", tier: "rookie" },

  // ---------- EXPLORER (moderately known) ----------
  { name: "Portugal", capital: "Lisbon", flag: "🇵🇹", continent: "Europe", tier: "explorer" },
  { name: "Poland", capital: "Warsaw", flag: "🇵🇱", continent: "Europe", tier: "explorer" },
  { name: "Sweden", capital: "Stockholm", flag: "🇸🇪", continent: "Europe", tier: "explorer" },
  { name: "Norway", capital: "Oslo", flag: "🇳🇴", continent: "Europe", tier: "explorer" },
  { name: "Vietnam", capital: "Hanoi", flag: "🇻🇳", continent: "Asia", tier: "explorer" },
  { name: "Thailand", capital: "Bangkok", flag: "🇹🇭", continent: "Asia", tier: "explorer" },
  { name: "Indonesia", capital: "Jakarta", flag: "🇮🇩", continent: "Asia", tier: "explorer" },
  { name: "Philippines", capital: "Manila", flag: "🇵🇭", continent: "Asia", tier: "explorer" },
  { name: "Malaysia", capital: "Kuala Lumpur", flag: "🇲🇾", continent: "Asia", tier: "explorer" },
  { name: "Kenya", capital: "Nairobi", flag: "🇰🇪", continent: "Africa", tier: "explorer" },
  { name: "Nigeria", capital: "Abuja", flag: "🇳🇬", continent: "Africa", tier: "explorer" },
  { name: "Morocco", capital: "Rabat", flag: "🇲🇦", continent: "Africa", tier: "explorer" },
  { name: "Chile", capital: "Santiago", flag: "🇨🇱", continent: "South America", tier: "explorer" },
  { name: "Peru", capital: "Lima", flag: "🇵🇪", continent: "South America", tier: "explorer" },
  { name: "Colombia", capital: "Bogota", flag: "🇨🇴", continent: "South America", tier: "explorer" },
  { name: "New Zealand", capital: "Wellington", flag: "🇳🇿", continent: "Oceania", tier: "explorer" },
  { name: "Ireland", capital: "Dublin", flag: "🇮🇪", continent: "Europe", tier: "explorer" },
  { name: "Austria", capital: "Vienna", flag: "🇦🇹", continent: "Europe", tier: "explorer" },
  { name: "Switzerland", capital: "Bern", flag: "🇨🇭", continent: "Europe", tier: "explorer" },
  { name: "Finland", capital: "Helsinki", flag: "🇫🇮", continent: "Europe", tier: "explorer" },

  // ---------- GLOBETROTTER (tricky) ----------
  { name: "Bhutan", capital: "Thimphu", flag: "🇧🇹", continent: "Asia", tier: "globetrotter" },
  { name: "Kazakhstan", capital: "Astana", flag: "🇰🇿", continent: "Asia", tier: "globetrotter" },
  { name: "Mongolia", capital: "Ulaanbaatar", flag: "🇲🇳", continent: "Asia", tier: "globetrotter" },
  { name: "Slovenia", capital: "Ljubljana", flag: "🇸🇮", continent: "Europe", tier: "globetrotter" },
  { name: "Latvia", capital: "Riga", flag: "🇱🇻", continent: "Europe", tier: "globetrotter" },
  { name: "Estonia", capital: "Tallinn", flag: "🇪🇪", continent: "Europe", tier: "globetrotter" },
  { name: "Burkina Faso", capital: "Ouagadougou", flag: "🇧🇫", continent: "Africa", tier: "globetrotter" },
  { name: "Madagascar", capital: "Antananarivo", flag: "🇲🇬", continent: "Africa", tier: "globetrotter" },
  { name: "Suriname", capital: "Paramaribo", flag: "🇸🇷", continent: "South America", tier: "globetrotter" },
  { name: "Vanuatu", capital: "Port Vila", flag: "🇻🇺", continent: "Oceania", tier: "globetrotter" },
  { name: "Kyrgyzstan", capital: "Bishkek", flag: "🇰🇬", continent: "Asia", tier: "globetrotter" },
  { name: "Eswatini", capital: "Mbabane", flag: "🇸🇿", continent: "Africa", tier: "globetrotter" },
  { name: "Azerbaijan", capital: "Baku", flag: "🇦🇿", continent: "Asia", tier: "globetrotter" },
  { name: "Moldova", capital: "Chisinau", flag: "🇲🇩", continent: "Europe", tier: "globetrotter" },
  { name: "Djibouti", capital: "Djibouti City", flag: "🇩🇯", continent: "Africa", tier: "globetrotter" },
];

const TIER_INFO = {
  rookie:      { label: "Rookie",      points: 10, hints: 3 },
  explorer:    { label: "Explorer",    points: 20, hints: 2 },
  globetrotter:{ label: "Globetrotter",points: 30, hints: 2 },
};
