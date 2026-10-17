import re
from fpdf import FPDF

class PDF(FPDF):
    def header(self):
        self.set_font("helvetica", "B", 14)
        self.cell(0, 10, "TASK 05 - EMERGING TECHNOLOGY INNOVATION", border=False, align="C")
        self.ln(15)

    def footer(self):
        self.set_y(-15)
        self.set_font("helvetica", "I", 8)
        self.cell(0, 10, f"Page {self.page_no()}", align="C")

with open("report.md", "r", encoding="utf-8") as f:
    text = f.read()

pdf = PDF()
pdf.add_page()
pdf.set_auto_page_break(auto=True, margin=15)

# Process text
text = text.replace('—', '-')
text = text.replace('**', '')
text = text.replace('# ', '')
text = text.replace('## ', '')
text = text.replace('`', '')
# Handle unicode correctly for fpdf
text = text.encode('latin-1', 'replace').decode('latin-1')

pdf.set_font("helvetica", "", 11)
pdf.multi_cell(0, 6, text)

pdf.output("report.pdf")
print("report.pdf generated successfully.")
