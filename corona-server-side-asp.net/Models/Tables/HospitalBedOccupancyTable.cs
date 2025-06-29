namespace corona_server_side_asp.net.Models.Tables
{
    public class HospitalBedOccupancyTable : TableModel
    {
        public List<HospitalBedOccupancyItem> Rows { get; set; } = new();
    }
}
