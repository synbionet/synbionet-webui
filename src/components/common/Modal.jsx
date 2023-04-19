export function Modal({ title, text, isOpen, onClose }) {
  return (
    <div>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-10">
          <div className="absolute w-full h-full bg-gray-900 opacity-50" onClick={onClose} />
          <div
            className="bg-white rounded w-3/4 h-3/4 z-50 p-8 overflow-y-scroll"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between">
              <div className="text-lg font-medium">{title}</div>
              <button className="text-xl font-bold text-gray-600" onClick={onClose}>
                X
              </button>
            </div>
            <div className="mt-6 text-gray-600 flex flex-col space-y-6">
              <div>
                SynBio Technologies LLC and its subsidiaries and affiliates are providing this
                website, including all information, tools and services available from this site to
                you, the user, conditioned upon your acceptance of all terms, conditions, policies
                and notices stated here.
              </div>
              <div>
                **Service Specifications:** The price for any service or product shall be the price
                stated in the Synbio Technologies’ formal quotation. Synbio Technologies quotations
                are valid through 30 days from the issued date. Changes to the scope of services (or
                products) must be agreed upon and authorized by representatives of both Synbio
                Technologies and client in writing.
              </div>
              <div>
                **Shipment and Delivery Terms:** Shipping and handling fees will be included in the
                invoice, except for specifically quoted. Additional fees for shipping and handling,
                such as wet ice and dry ice packaging fees are included in all invoices as
                appropriate.
              </div>
              <div>
                **Products Acceptance and Returns:** If any products shipped to the customer under
                an order do not materially conform to the applicable sequence submission and
                quotation or other specifications in the order, or are damaged or short in quantity,
                then the customer can notify Synbio Technologies within thirty (30) days of
                customer’s receipt of such products to arrange for the return and replacement of
                such products. Synbio Technologies will use commercially reasonable efforts to
                produce and ship customer replacement products within a reasonable period of time;
                provided that Synbio Technologies may cancel such order (and refund or credit to
                customer any prepaid amounts received from customer) if Synbio Technologies has
                already shipped replacement products for such order once before or if Synbio
                Technologies is unable to produce conforming products. The foregoing shall be
                customer’s sole and exclusive remedy, and Synbio Technologies sole and exclusive
                liability, for any failure of products to conform to the order or otherwise be
                satisfactory to customer. Shipping charges of customer will not be credited or
                refunded with respect to returns.
              </div>
              <div>
                **Payment Terms:** Unless specifically quoted, payment shall be made within 30 days
                from the date of the invoice(s).
              </div>
              <div>
                **Taxes:** Clients will be responsible for any taxes, fees, duties and charges
                imposed any governmental authority, including but not limited to use tax, sales tax,
                custom duty, or excise tax. If client have tax exempt status, a copy of the
                exemption certificate should be sent along with your order confirmation.
              </div>
              <div>
                **Confidentiality:** All IP information including DNA sequence and its related
                information are kept strictly confidential in the entire process by Synbio
                Technologies. Clients will be notified in advance if the disclosure is requested in
                any legal proceeding.
              </div>
              <div>
                **Indemnification:** Clients shall indemnify and hold harmless Synbio Technologies,
                its subsidiaries and affiliates, and their employees from and against any and all
                expenses, damages, costs, judgments, and losses arising from clients’ services (or
                products) based on deliverables or any portion thereof.
              </div>
              <div>
                **Force Majeure:** Synbio Technologies shall not be deemed in default hereunder for
                any cessation, interruption or delay in the performance of its obligations due to
                causes beyond its reasonable control, including but not limited to: earthquake,
                flood, or other natural disaster, labor controversy, civil disturbance, war (whether
                or not officially declared) or the inability to obtain sufficient supplies,
                transportation, or other essential commodity or service required in the conduct of
                its business, or any change in or the adoption of any law, regulation, judgment or
                decree (each a “Force Majeure Event”). In the event of any such delay or failure of
                performance, Synbio Technologies shall have such additional time within which to
                perform its obligations hereunder as may be reasonably necessary under the
                circumstances.
              </div>
              <div>
                **Limitation of Liability:** Synbio Technologies’ liability shall be limited to the
                price paid by clients for the services (or products) on the relevant sales
                transaction. Except as prohibited by law, in no event shall Synbio Technologies be
                liable as a result of Synbio Technologies’ performance of the services (or products)
                for any indirect, special, incidental, consequential or exemplary damages, including
                but not limited to damages for loss of profit, loss of customers, loss of data, or
                loss of business.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
