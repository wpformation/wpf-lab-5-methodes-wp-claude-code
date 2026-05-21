<?php
/**
 * Render template for wpf/lab-team.
 *
 * @var array $attributes Block attributes.
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }

$eyebrow    = isset( $attributes['eyebrow'] )    ? $attributes['eyebrow']    : '';
$title_p1   = isset( $attributes['titlePart1'] ) ? $attributes['titlePart1'] : '';
$title_acid = isset( $attributes['titleAcid'] )  ? $attributes['titleAcid']  : '';
$title_p2   = isset( $attributes['titlePart2'] ) ? $attributes['titlePart2'] : '';

$team = array(
    array(
        'role_n'  => '01 · HUMAN',
        'badge'   => '★ HUM',
        'hue'     => '12',
        'name'    => 'fabrice',
        'role'    => 'Formateur WordPress · WPFormation',
        'bio'     => "Fondateur de WPFormation, lancé en 2012. Formateur WordPress indépendant et auteur de l'article de référence comparant les 7 méthodes × Claude Code.",
        'contrib' => '7/7',
        'tag'     => 'lead',
        'claude'  => false,
    ),
    array(
        'role_n'  => '02 · HUMAN',
        'badge'   => '★ HUM',
        'hue'     => '320',
        'name'    => 'alexandra',
        'role'    => 'Stagiaire · WPFormation',
        'bio'     => "Stagiaire en formation WordPress chez WPFormation. C'est en l'accompagnant sur son projet de fin de formation que l'idée du benchmark a germé.",
        'contrib' => '7/7',
        'tag'     => 'stagiaire',
        'claude'  => false,
    ),
    array(
        'role_n'  => '03 · AGENT',
        'badge'   => '★ AI',
        'hue'     => '260',
        'name'    => 'claude code',
        'role'    => 'Agent de développement',
        'bio'     => "Outil utilisé pour générer les 7 démos. Six sessions, 32 itérations sur le système et le ratio prompt/coût/qualité.",
        'contrib' => '7/7',
        'tag'     => 'agent',
        'claude'  => true,
    ),
);

$wrapper_attrs = get_block_wrapper_attributes( array(
    'class' => 'wpf-lab-team alignfull',
) );
?>
<section <?php echo $wrapper_attrs; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
    <div class="wpf-lab-team__head">
        <p class="wpf-lab-team__eyebrow"><?php echo esc_html( $eyebrow ); ?></p>
        <h2 class="wpf-lab-team__title"><?php echo esc_html( $title_p1 ); ?> <span class="wpf-lab-team__hl"><?php echo esc_html( $title_acid ); ?></span> <?php echo esc_html( $title_p2 ); ?></h2>
    </div>
    <div class="wpf-lab-team__grid">
        <?php foreach ( $team as $m ) : ?>
            <div class="wpf-lab-team__card <?php echo $m['claude'] ? 'wpf-lab-team__card--claude' : ''; ?>">
                <div class="wpf-lab-team__head-row">
                    <p><?php echo esc_html( $m['role_n'] ); ?></p>
                    <p class="wpf-lab-team__badge"><?php echo esc_html( $m['badge'] ); ?></p>
                </div>
                <div class="wpf-lab-team__id">
                    <div class="wpf-lab-team__avatar wpf-lab-team__avatar--hue<?php echo esc_attr( $m['hue'] ); ?>"></div>
                    <div>
                        <h3 class="wpf-lab-team__name"><?php echo esc_html( $m['name'] ); ?></h3>
                        <p class="wpf-lab-team__role"><?php echo esc_html( $m['role'] ); ?></p>
                    </div>
                </div>
                <p class="wpf-lab-team__bio"><?php echo esc_html( $m['bio'] ); ?></p>
                <div class="wpf-lab-team__stats">
                    <div>
                        <p class="label">CONTRIB.</p>
                        <p class="val"><?php echo esc_html( $m['contrib'] ); ?></p>
                    </div>
                    <div>
                        <p class="label">RÔLE</p>
                        <p class="val role"><?php echo esc_html( $m['tag'] ); ?></p>
                    </div>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
</section>
