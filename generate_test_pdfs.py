import sys

pdf_v1_content = """%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length 285 >>
stream
BT
/F1 12 Tf
50 700 Td
(MASTER SERVICES AGREEMENT v1) Tj
0 -20 Td
(Effective Date: January 1, 2026) Tj
0 -20 Td
(Parties: Alpha Corp and Beta Solutions LLC) Tj
0 -20 Td
(Contract Value: $50,000 USD) Tj
0 -20 Td
(Payment Terms: Net 30 days) Tj
0 -20 Td
(Termination Clause: Either party may terminate with 30 days written notice.) Tj
0 -20 Td
(Governing Law: State of New York) Tj
ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000059 00000 n 
0000000116 00000 n 
0000000243 00000 n 
0000000580 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
650
%%EOF
"""

pdf_v2_content = """%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length 340 >>
stream
BT
/F1 12 Tf
50 700 Td
(MASTER SERVICES AGREEMENT v2) Tj
0 -20 Td
(Effective Date: February 1, 2026) Tj
0 -20 Td
(Parties: Alpha Corp and Beta Solutions LLC) Tj
0 -20 Td
(Contract Value: $120,000 USD) Tj
0 -20 Td
(Payment Terms: Net 60 days) Tj
0 -20 Td
(Termination Clause: Either party may terminate with 90 days written notice.) Tj
0 -20 Td
(Liability Cap: Unlimited liability for breaches.) Tj
0 -20 Td
(Governing Law: State of California) Tj
ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000059 00000 n 
0000000116 00000 n 
0000000243 00000 n 
0000000635 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
705
%%EOF
"""

with open("test_contract_v1.pdf", "w", encoding="utf-8") as f:
    f.write(pdf_v1_content)

with open("test_contract_v2.pdf", "w", encoding="utf-8") as f:
    f.write(pdf_v2_content)

print("Sample PDFs created successfully.")
