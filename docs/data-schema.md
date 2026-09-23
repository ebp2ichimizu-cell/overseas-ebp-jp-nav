# データスキーマ暫定仕様 v0.1

## problems.json
`id, name_ja, name_en, summary_ja, case_ids[], intervention_ids[]`

## interventions.json
`id, name_ja, name_en, summary_ja, problem_ids[], case_ids[], evidence_page_ids[]`

## cases.json
`id, title_ja, title_en, source_id, problem_ids[], intervention_ids[], theory_labels[], summary_ja, result_ja, commentary_slug, original_url`

## sources.json
`id, name, role_ja`

## evidence-pages.json
`id, source_id, intervention_id, title_ja, summary_ja, commentary_slug, original_url, translation_id`

## translations.json
`id, title_ja, content_slug, original_url, license, status`

### 関係
problem → cases → interventions  
intervention → evidence-pages → source  
intervention → cases  
case → problem / intervention / theory label  
evidence-page → original / translation
