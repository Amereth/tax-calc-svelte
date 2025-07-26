<script lang="ts">
	import { page } from '$app/state'
	import TaxMonth from '$lib/components/taxMonth.svelte'
	import { superForm } from 'sveltekit-superforms'
	import {
		newTaxSchema,
		newTaxSchemaDefaults,
		type NewTaxSchema,
	} from './schema'
	import { arktype } from 'sveltekit-superforms/adapters'
	import { Field, Control, Label, FieldErrors } from 'formsnap'
	import { CheckIcon, XIcon } from 'lucide-svelte'

	const { data } = $props()

	const form = superForm<NewTaxSchema>(data.form, {
		validators: arktype(newTaxSchema, { defaults: newTaxSchemaDefaults }),
	})

	const { form: formData, enhance } = form

	let selectedTaxName = $state(data.taxes[0].name)

	const selectedTaxes = $derived(
		data.taxes.filter((tax) => tax.name === selectedTaxName),
	)

	const year = $derived(page.params.year)
</script>

<div class="flex flex-col items-center gap-2">
	<select bind:value={selectedTaxName} class="select input-group-shim w-min">
		{#each data.taxNames as taxName}
			<option value={taxName}>{taxName}</option>
		{/each}
	</select>

	<form
		method="POST"
		use:enhance
		action="?/insert"
		class="mt-8 grid grid-cols-2 gap-x-16 gap-y-8"
	>
		<div>
			<Field {form} name="name">
				<Control>
					{#snippet children({ props })}
						<Label>tax name</Label>
						<input
							{...props}
							type="text"
							bind:value={$formData.name}
							class="input"
						/>
						<div class="mt-2 flex gap-2">
							{#each data.taxNames as taxName}
								<button
									class="border-primary-500 flex items-center rounded-xl border px-2 text-sm leading-none"
									type="button"
									onclick={() =>
										formData.update((value) => ({ ...value, name: taxName }))}
								>
									{taxName}
								</button>
							{/each}
						</div>
					{/snippet}
				</Control>
				<FieldErrors />
			</Field>
		</div>

		<div>
			<Field {form} name="type">
				<Control>
					{#snippet children({ props })}
						<Label>tax type</Label>
						<select
							{...props}
							bind:value={$formData.type}
							class="select input-group-shim w-min"
						>
							<option value="fixed">fixed</option>
							<option value="percent">percent</option>
						</select>
					{/snippet}
				</Control>
				<FieldErrors />
			</Field>
		</div>

		<div>
			<Field {form} name="date">
				<Control>
					{#snippet children({ props })}
						<Label>tax month</Label>
						<input
							type="month"
							min="{year}-01"
							max="{year}-12"
							{...props}
							bind:value={$formData.date}
							class="input"
						/>
					{/snippet}
				</Control>
				<FieldErrors />
			</Field>
		</div>

		<div>
			<Field {form} name="sum">
				<Control>
					{#snippet children({ props })}
						<Label>tax sum</Label>
						<input
							type="number"
							{...props}
							bind:value={$formData.sum}
							step="0.01"
						/>
					{/snippet}
				</Control>
				<FieldErrors />
			</Field>
		</div>

		<div class="mt-6 flex gap-4">
			<button type="submit" class="icon">
				<CheckIcon size="16" />
			</button>

			<button type="reset" class="icon">
				<XIcon size="16" />
			</button>
		</div>
	</form>

	{#each selectedTaxes as tax, index (tax.id)}
		<TaxMonth
			date="{year}-{(index + 1).toString().padStart(2, '0')}"
			id={tax.id}
			sum={tax.sum}
			type={tax.type}
		/>
	{/each}
</div>
