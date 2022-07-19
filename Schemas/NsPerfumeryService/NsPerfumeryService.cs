namespace Terrasoft.Configuration.NsCustomNamespace
{
    using System.ServiceModel;
    using System.ServiceModel.Activation;
    using System.ServiceModel.Web;
    using Terrasoft.Core;
    using Terrasoft.Core.Entities;
    using Terrasoft.Web.Common;

    // http://localhost:8004/0/rest/NsPerfumeryService/GetFreePerfumeCount
    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
    public class NsPerfumeryService : BaseService
    {
        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
         ResponseFormat = WebMessageFormat.Json)]
        public string GetFreePerfumeCount()
        {
            string result;
            try
            {
                var esq = new EntitySchemaQuery(UserConnection.EntitySchemaManager, "NsPerfumery");
                esq.AddColumn("Id");
                var esqFilter = esq.CreateFilterWithParameters(FilterComparisonType.Equal, "Price", 0);
                esq.Filters.Add(esqFilter);
                result = esq.GetEntityCollection(UserConnection).Count.ToString();
            }
            catch (System.Exception ex)
            {
                result = ex.Message;
            }
            return result;
        }
    }
}