export interface PaymentDetails {
   paymentStatus: string;
   paidAmount: number;
   totalAmount: number;
   remainingAmount: number;
}

export interface Invoice {
   id: string;
   companyId: string;
   userId: string | null;
   customerName: string;
   supplierName: string;
   supplierId: string;
   supplierVat: string;
   status: string;
   invoiceNumber: string;
   taxExclusiveAmount: number;
   taxInclusiveAmount: number;
   lineExtensionAmount: number;
   payableAmount: number;
   allowanceTotalAmount: number | null;
   currency: string;
   createdTime: string;
   localCreatedTime: string;
   issueDate: string;
   deliveryDate: string | null;
   dueDate: string;
   supplierCountryCode: string;
   supplierEndpoint: string;
   customerId: string | null;
   customerVat: string;
   customerEndpoint: string | null;
   customerCountryCode: string;
   typeCode: string | null;
   documentType: string;
   errorMessage: string | null;
   lastUpdatedTime: string;
   localLastUpdatedTime: string;
   type: string;
   idIncarcare: string | null;
   idDescarcare: string | null;
   source: string;
   sendViaPeppol: boolean;
   statusTime: string;
   fileName: string | null;
   paymentDetails: PaymentDetails;
   paymentStatus: string;
}
