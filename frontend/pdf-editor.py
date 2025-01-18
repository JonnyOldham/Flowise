import pikepdf
from pathlib import Path

# Define input and output folder paths relative to the script location
input_folder = Path("docs")
output_folder = Path("source-docs")

doc_id_prefix = "wirr"
starting_id = 1

# Ensure the output folder exists
output_folder.mkdir(parents=True, exist_ok=True)

for index, pdf_path in enumerate(input_folder.glob("*.pdf"), start=starting_id):
  # Generate unique document ID
  document_id = f"{doc_id_prefix}{index:04d}"  # e.g., wirr0001, wirr0002, etc.
    
  # Open the PDF with pikepdf
  with pikepdf.open(pdf_path) as pdf:
    # Set the title in both 'dc:title' and 'info.Title' fields to the exact file name
    pdf.docinfo['/dc:title'] = pdf_path.stem  # File name without .pdf extension
    pdf.docinfo['/title'] = pdf.docinfo['/dc:title']  # Sync Title field with dc:title
        
    # Add unique document ID in the 'xmpmm:documentid' field
    pdf.docinfo['/xmpmm:documentid'] = document_id
        
    # Set the creator to 'wirr' for consistent attribution
    pdf.docinfo['/dc:creator'] = "wirr"
        
    # Save the updated PDF to the output folder
    output_pdf_path = output_folder / pdf_path.name
    pdf.save(output_pdf_path)

  print(f"Processed {pdf_path.name} with Document ID: {document_id}")

print("All PDFs have been processed and saved with updated metadata.")
