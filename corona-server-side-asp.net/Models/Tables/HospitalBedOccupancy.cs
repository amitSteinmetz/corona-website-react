namespace corona_server_side_asp.net.Models.Tables
{
    public class HospitalBedOccupancyTable : TableModel
    {
        public string HospitalName { get; set; }
        public double GeneralBedOccupancy { get; set; }
        public double InternalDepartmentBedOccupancy { get; set; }
    }
}
