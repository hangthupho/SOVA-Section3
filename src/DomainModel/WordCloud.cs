using StackOverFLow.DomainModel;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DomainModel
{
    public class WordCloud
    {
        [Key]
        [Column("text")]
        public string Text { get; set; }
        [Column("weight")]
        public double? Weight { get; set; }
       
    }
}
