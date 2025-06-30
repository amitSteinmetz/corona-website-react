﻿using corona_server_side_asp.net.Models.Tables;

namespace corona_server_side_asp.net.IRepositories
{
    public interface ITablesRepository
    {
        Task<int> AddTableToSection(int sectionId, TableModel table);
        Task<TableModel> GetTable(int sectionId, int tableId);
        Task<int> DeleteTable(int sectionId, int tableId);
    }
}