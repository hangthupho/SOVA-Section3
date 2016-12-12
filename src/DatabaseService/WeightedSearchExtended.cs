using DomainModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatabaseService
{
    public class WeightedSearchExtended : WeightedSearch
    {
        public string TagName { get; set; }
        public int Status { get; set; }
    }
}
