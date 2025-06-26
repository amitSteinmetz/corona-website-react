namespace corona_server_side_asp.net.Repositories
{
    public class TablesRepository
    {

        public async Task<int> AddTableFromExcel(IFormFile file, string tableTitle)
        {
            if (file == null || file.Length == 0)
            {
                throw new Exception("File cannot be null or empty.");
            }

            using var stream = new MemoryStream();
            await file.CopyToAsync(stream);
            stream.Position = 0;
            // Assuming you have a method to process the Excel file and extract table data
            //var tableData = await ProcessExcelFile(stream);
            // Assuming you have a method to save the table data to the database
            //return await SaveTableDataToDatabase(tableData);
        }
    }
}
